import TeamMemberModel from "../models/teamMember.js";

async function getAllTeamMembers(req, res, next) {
    try {
    const allTeamMembers = await TeamMemberModel.find();
if(allTeamMembers){

    res.status(200).send(allTeamMembers);
}else{
    res.status(404).send('no team members found');
}
    } catch (err) {
        console.log(err);
    return res.status(500).send(err.message);
    }
}

async function getUser(req, res, next) {
    console.log('this is the PARAMS:',req.params.id)
    console.log('this is the BODY:',req.body);
    console.log('this is the headers:',req.headers);
    try {
    const allTeamMembers = await TeamMemberModel.findOne();
if(allTeamMembers){

    res.status(200).send(allTeamMembers);
}else{
    res.status(404).send('no team members found');
}
    } catch (err) {
        console.log(err);
    return res.status(500).send(err.message);
    }
}

export { getAllTeamMembers, getUser}