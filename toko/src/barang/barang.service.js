const {
    Barang
} = require('./barang.entity');

const getBarang = (query)=> {
    const data = Barang;
    if (!query) {
        return data
    }
    const{
        stok
    } = query;

    const filterData = data.filter((item) => item.stok == stok)
    // return data;
    // return "Ini Get Barang";
    return filterData;
}

const getBarangByID = (id) => {
    const data = Barang;
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

const postBarang = (input)=> {
    const data = Barang;
    data.push({
        id : input.id,
        nama : input.nama,
        stok: input.stok
    });
    return data;
    // return "Ini Post Barang";
}

const updateBarang = (id,input)=> {
    const  {
        nama,
        stok
    } = input;

    const data = Barang;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data[indexData].nama = nama;
    data[indexData].stok = stok;

    return data;
    // return `Ini Update Barang ${id}`;
}

const deleteBarang = (id)=> {
    const data = Barang;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data.splice(indexData,1)
    // return `Ini Delete Barang ${id}`;
}

module.exports = {
    getBarang,
    getBarangByID,
    postBarang,
    updateBarang,
    deleteBarang

};