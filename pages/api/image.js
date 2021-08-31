

export default async function handler(req, res) {
    const fileurl = req.query.link;
    const img = await fetch(fileurl);
    const imgBuffer = await img.buffer();
    res.status(200)
    res.setHeader('Content-Type', 'image/jpg')
    res.send(imgBuffer)
  }