import mongoose from "mongoose";

const { Schema } = mongoose;

const teamMember = new Schema({
    userName: String,
    password: String,
    branch_id: Array,
    image: String,
    email: String,
    permissions: Object

});

const TeamMemberModel = mongoose.model("teamMember", teamMember);

export default TeamMemberModel;
