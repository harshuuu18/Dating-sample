import fs from 'fs'

export default async function (req,res) {
    const User = fs.readFileSync('./data/user.json')
    res.json(User)
};
