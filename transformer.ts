// transformer.ts
export type UserData = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
      color: string;
      type: string;
    };
    domain: string;
    ip: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    macAddress: string;
    university: string;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    company: {
      address: {
        address: string;
        city: string;
        coordinates: {
          lat: number;
          lng: number;
        };
        postalCode: string;
        state: string;
      };
      department: string;
      name: string;
      title: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
      coin: string;
      wallet: string;
      network: string;
    };
  };
  
  export type TransformedData = {
    [department: string]: {
      male: number;
      female: number;
      ageRange: string;
      hair: {
        [color: string]: number;
      };
      addressUser: {
        [fullName: string]: string; // "firstNameLastName" : postalCode
      };
    };
  };
  

  export function transformUserData(users: UserData[]): TransformedData {
    const transformed: TransformedData = {};
    users.forEach(user => {
        const department = user.company.department;
        if (!transformed[department]) {
            transformed[department] = { male: 0, female: 0, ageRange: "99-0", hair: {}, addressUser: {} };
        }
        const deptData = transformed[department];
        deptData[user.gender === "male" ? "male" : "female"]++;

        // Update age range
        const ageRange = deptData.ageRange.split('-').map(Number);
        deptData.ageRange = `${Math.min(ageRange[0], user.age)}-${Math.max(ageRange[1], user.age)}`;

        // Update hair color count
        if (deptData.hair[user.hair.color]) {
            deptData.hair[user.hair.color]++;
        } else {
            deptData.hair[user.hair.color] = 1;
        }

        // Update addressUser
        const fullName = user.firstName + user.lastName;
        deptData.addressUser[fullName] = user.address.postalCode;
    });

    // Adjust the ageRange format to "minAge-maxAge"
    Object.keys(transformed).forEach(department => {
        const ageRange = transformed[department].ageRange.split('-').map(Number);
        if (ageRange[0] === 99 && ageRange[1] === 0) {
            transformed[department].ageRange = ""; // If no users, clear the ageRange
        } else {
            transformed[department].ageRange = `${ageRange[0]}-${ageRange[1]}`;
        }
    });

    return transformed;
}

