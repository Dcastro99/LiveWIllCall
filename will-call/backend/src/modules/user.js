import TeamMemberModel from "../models/teamMember.js";


import bcyrpt from "bcrypt";

const handleNewUser = async (req, res, next) => {
const { userName, password, email } = req.body;
if (!userName || !password) return res.status(400).send("missing required field");
const dup = await TeamMemberModel.find({ userName ,email});
for (const user of dup) {
    if (user.userName === userName) return res.status(400).send("username already exists");
    if (user.email === email) return res.status(400).send("email already exists");
}
    try {
        const salt = await bcyrpt.genSalt(10);
        const hashedPassword = await bcyrpt.hash(password, salt);
        const newUser = await TeamMemberModel.create({
        userName,
        password: hashedPassword,
        email,
        branch_id: req.body.branch_id,
        image: req.body.image,
        permissions: req.body.permissions,
    });

        res.status(200).send( newUser);

    }catch (err) {
        res.status(500).send(err.message);
    };
};

const handleLogin = async (req, res) => {
    const { userName, password } = req.body;
    console.log('LOGIN POST',req.body);
    if (!userName || !password) return res.status(400).send("missing required field");

    const foundUser = await TeamMemberModel.findOne({ userName });
    console.log('FOUND USER',foundUser);
    if (!foundUser) return res.status(400).send("user not found");
    const validPassword = await bcyrpt.compare(password, foundUser.password);
    console.log(validPassword);
    if (!validPassword) return res.status(400).send("invalid password");
    if(foundUser.userName === userName && validPassword) return res.status(200).send(foundUser);
    else return res.status(400).send("invalid username or password");
};





export {  handleNewUser, handleLogin };