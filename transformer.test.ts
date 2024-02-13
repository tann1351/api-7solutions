// transformer.test.ts
import { UserData, transformUserData ,TransformedData} from './transformer';

describe('transformUserData', () => {
    it('should correctly transform data', () => {
     
        const sampleUsers: UserData[] = [{
            id: 1,
            firstName: "Terry",
            lastName: "Medhurst",
            age: 50,
            gender: "male",
            email: "atuny0@sohu.com",
            phone: "+63 791 675 8914",
            username: "atuny0",
            password: "9uQFF1Lh",
            birthDate: "2000-12-25",
            image: "https://robohash.org/Terry.png?set=set4",
            bloodGroup: "A-",
            height: 189,
            weight: 75.4,
            eyeColor: "Green",
            hair: {
                color: "Black",
                type: "Strands"
            },
            domain: "slashdot.org",
            ip: "117.29.86.254",
            address: {
                address: "1745 T Street Southeast",
                city: "Washington",
                coordinates: {
                   lat: 38.867033,
                   lng: -76.979235
                },
                postalCode: "20020",
                state: "DC"
            },
            macAddress: "13:69:BA:56:A3:74",
            university: "Capitol University",
            bank: {
                cardExpire: "06/22",
                cardNumber: "50380955204220685",
                cardType: "maestro",
                currency: "Peso",
                iban: "NO17 0695 2754 967"
            },
            company: {
                address: {
                   address: "629 Debbie Drive",
                   city: "Nashville",
                   coordinates: {
                      lat: 36.208114,
                      lng: -86.58621199999999
                   },
                   postalCode: "37076",
                   state: "TN"
                },
                department: "Marketing",
                name: "Blanda-O'Keefe",
                title: "Help Desk Operator"
            },
            ein: "20-9487066",
            ssn: "661-64-2976",
            userAgent: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
            crypto: {
                coin: "Bitcoin",
                wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
                network: "Ethereum (ERC20)"
            }
        }];
        
        const transformed = transformUserData(sampleUsers);

        // console.log('transformed>>>',transformed)

        
        const expected: TransformedData = {
            Marketing: { // คีย์นี้ตรงกับชื่อแผนกของผู้ใช้
                male: 1, // นับจำนวนผู้ชายในแผนก
                female: 0, // จากข้อมูลตัวอย่าง, ไม่มีผู้หญิงในแผนกนี้
                ageRange: "50-50", // ช่วงอายุตั้งแต่ขั้นต่ำถึงสูงสุด ซึ่งเป็น 50 เนื่องจากมีเพียงหนึ่งบุคคล
                hair: {
                    Black: 1, // สีผมของผู้ใช้ตัวอย่างคือดำ
                },
                addressUser: {
                    TerryMedhurst: "20020", // รหัสไปรษณีย์จากข้อมูลตัวอย่างของ Terry Medhurst
                }
            }
        };
        
        
        expect(transformed).toEqual(expected);
    });
});