import { Request, Response } from 'express';

function changeLanguage(req: Request, res: Response) {
    const { lang } = req.body;
    res.cookie('lang', lang).json({ msg: "Linguagem Mudada",lang });
}

export default { changeLanguage };