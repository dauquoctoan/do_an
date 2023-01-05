class siteController {
    home(req: any, res: any) {
        res.send(req.session)
    }
}
export default new siteController()
