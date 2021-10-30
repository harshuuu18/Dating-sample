import fs from 'fs'

export default async function(req,res) {
    const data = await fs.readFileSync('./data/post.json')
    res.json(data)

};
