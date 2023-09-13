const {
    Produk
} = require('./produk.entity');

const getProduk = (query)=> {
    const data = Produk;
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
    // return "Ini Get Produk";
    // return filterData;
    return filterDataNama;
}

const getProdukByID = (id) => {
    const data = Produk;
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

const postProduk = (input)=> {
    const data = Produk;
    data.push({
        id : input.id,
        nama : input.nama,
        stok: input.stok
    });
    return data;
    // return "Ini Post Produk";
}

const updateProduk = (id,input)=> {
    const  {
        nama,
        stok
    } = input;

    const data = Produk;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data[indexData].nama = nama;
    data[indexData].stok = stok;

    return data;
    // return `Ini Update Produk ${id}`;
}

const deleteProduk = (id)=> {
    const data = Produk;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data.splice(indexData,1)
    // return `Ini Delete Produk ${id}`;
}

module.exports = {
    getProduk,
    getProdukByID,
    postProduk,
    updateProduk,
    deleteProduk

};