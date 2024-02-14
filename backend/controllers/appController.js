import App from "../models/appModel.js";

const create = async (req, res) => {
    const { company, website, position, city, remote, salary, status, platform, note } = req.body;

    try {
        if(!company || !website || !position || !city || !remote || !salary || !status || !platform || !note) {
            return res.status(400).json({ message: "incomplete data." });
        }
        
        const appExists = await App.findOne({ company });
        
        if (appExists) {
            if (appExists.position === position) {
                return res.status(400).json({ message: "Already applied" })
            }
        }

        const newApp = await App.create({
            company,
            website,
            position,
            city,
            remote,
            salary,
            status,
            platform,
            note,
            userId: req.user
        });

        res.status(201).json({ message: "Application submitted" })
    } catch (error) {
        res.status(400).json({ error: req.user })
    }
}

const getAll = async (req, res) => {
    const userID = req.user;
    try {
       const applications = await App.find({ userId: userID })
       res.status(200).json(applications)
    } catch (error) {
        res.status(400).json({ error: "something went wrong" })
    }
}

const getById = async (req, res) => {
    const { appId } = req.params;

    const application = await App.findById({ _id: appId});
    res.json(application)
}

const update = async (req, res) => {
    const { appId } = req.params;

    try {
        const updatedApp = await App.findByIdAndUpdate(appId, req.body, { new: true});
        res.json(updatedApp);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const remove = async (req, res) => {
    const { appId } = req.params;
    try {
        const deleteApp = await App.findByIdAndDelete(appId);
        res.json(deleteApp);
    } catch (error) {
        res.json({ error: error.message});
    }
}



export { create, getAll, getById, update, remove }