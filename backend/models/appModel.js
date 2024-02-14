import { mongoose } from "mongoose";

const appSchema = new mongoose.Schema({
    company: { type: String, required: true },
    website: { type: String, required: true },
    position: { type: String, required: true},
    city: { type: String, required: true },
    remote: { type: String, required: true },
    salary: { type: String, required: true },
    status: { type: String, required: true },
    platform: { type: String, required: true },
    note: { type: String, required: true },
    userId: { type: String, required: true}
},
{
    timestamps: true
});

const App = mongoose.model("App", appSchema);

export default App;