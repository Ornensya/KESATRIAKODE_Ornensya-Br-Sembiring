const {
    Kategori
} = require('./kategori.entity');

const getKategori = (query)=> {
    const data = Kategori;
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
    // return "Ini Get Kategori";
    // return filterData;
    return filterDataNama;
}

const getKategoriByID = (id) => {
    const data = Kategori;
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

const postKategori = (input)=> {
    const data = Kategori;
    data.push({
        id : input.id,
        nama : input.nama,
        stok: input.stok
    });
    return data;
    // return "Ini Post Kategori";
}

const updateKategori = (id,input)=> {
    const  {
        nama,
        stok
    } = input;

    const data = Kategori;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data[indexData].nama = nama;
    data[indexData].stok = stok;

    return data;
    // return `Ini Update Kategori ${id}`;
}

const deleteKategori = (id)=> {
    const data = Kategori;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }
    data.splice(indexData,1)
    // return `Ini Delete Kategori ${id}`;
}

module.exports = {
    getKategori,
    getKategoriByID,
    postKategori,
    updateKategori,
    deleteKategori

};