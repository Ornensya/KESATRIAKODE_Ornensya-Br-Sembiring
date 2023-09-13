const {
    admin
} = require('./admin.entity');

const getAdmin = (query)=> {
    const data = Admin;
    // console.log(query);

    if (Object.keys(query).length == 0) {
        return data
    }
    const{
        username
    } = query;

    // const filterData = data.filter((item) => item.stok == stok)
    const filterDataUsername = data.filter((item) => item.username.toLocaleLowerCase() == username)

    
    // return data;
    // return "Ini Get Admin";
    // return filterData;
    return filterDataUsername;
}

const getAdminByID = (id) => {
    const data = Admin;
    const findData = data.find((item) => {
        if(item.id == id){
            return item;
        }
    });

    if (!findData) {
        return null;
    }
    return findData;
    console.log(find);
    return data;
}

const postAdmin = (input)=> {
    const data = Admin;
    data.push({
        id : input.id,
        username : input.nama,
        password: input.stok
    });
    return data;
    // return "Ini Post Admin";
}

const updateAdmin = (id,input)=> {
    const  {
        username,
        password
    } = input;

    const data = Admin;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data[indexData].username = username;
    data[indexData].password = password;

    return data;
    // return `Ini Update Admin ${id}`;
}

const deleteAdmin = (id)=> {
    const data = Admin;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data.splice(indexData,1)
    // return `Ini Delete Admin ${id}`;
}

module.exports = {
    getAdmin,
    getAdminByID,
    postAdmin,
    updateAdmin,
    deleteAdmin

};