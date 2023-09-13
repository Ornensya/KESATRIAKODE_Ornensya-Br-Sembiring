const {
    Keranjang
} = require('./keranjang.entity');

const getKeranjang = (query)=> {
    const data = Keranjang;
    // console.log(query);

    if (Object.keys(query).length == 0) {
        return data
    }
    const{
        nama
    } = query;

    // const filterData = data.filter((item) => item.stok == stok)
    const filterDataNama = data.filter((item) => item.nama.toLocaleLowerCase() == nama)

    
    // return data;
    // return "Ini Get Keranjang";
    // return filterData;
    return filterDataNama;
}

const getKeranjangByID = (id) => {
    const data = Keranjang;
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

const postKeranjang = (input)=> {
    const data = Keranjang;
    data.push({
        id : input.id,
        nama : input.nama,
        stok: input.stok
    });
    return data;
    // return "Ini Post Keranjang";
}

const updateKeranjang = (id,input)=> {
    const  {
        nama,
        stok
    } = input;

    const data = Keranjang;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data[indexData].nama = nama;
    data[indexData].stok = stok;

    return data;
    // return `Ini Update Keranjang ${id}`;
}

const deleteKeranjang = (id)=> {
    const data = Keranjang;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data.splice(indexData,1)
    // return `Ini Delete Keranjang ${id}`;
}

module.exports = {
    getKeranjang,
    getKeranjangByID,
    postKeranjang,
    updateKeranjang,
    deleteKeranjang

};