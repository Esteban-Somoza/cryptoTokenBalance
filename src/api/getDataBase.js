import axios from "axios";

export default function getDataBase() {
    let dataBase = axios.get('http://localhost:3000/get')
    console.log(dataBase);
    return dataBase;
}