function getId(req) {
    let id = req.params.id;
    if(id === undefined && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE'))
        id = req.body.id;
    return id;
}
module.exports.GetID = getId;