import axios from 'axios';
import { UserData, transformUserData } from './transformer';
 


const fetchDataFromApi = async () => {
    try {
        // สมมติว่านี่คือ URL ของ API ที่คุณต้องการรับข้อมูล
        const apiUrl = 'https://dummyjson.com/users/?limit=100';


        
        // ทำการเรียก API
        const response = await axios.get<UserData[] | any>(apiUrl);

        // console.log('response.data>>>>',response.data.users)
        // ทำการเปลี่ยนแปลงข้อมูลที่ได้รับ
        const transformedData = transformUserData(response.data.users);

                
        // แสดงผลลัพธ์
        console.log(JSON.stringify(transformedData, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchDataFromApi();