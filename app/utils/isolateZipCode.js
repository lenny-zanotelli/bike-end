// Fonction qui récupère le premier "zip_code" valide (non null) pour une "place"
module.exports = (adminRegArray) => {
    adminRegWhereZipCodeExist = adminRegArray.filter(
        (adminReg) => adminReg.zip_code
    );
    if (adminRegWhereZipCodeExist.length > 0) {
        return adminRegWhereZipCodeExist[0].zip_code;
    }
};
