const audioNote = require("../models/audioNote");

//define four functions for Creating, Reading, Updating and Deleting

const createAudioNote = async (req,res) =>{
    const {title,fileName,filePath,duration,ampPath} = req.body;

    const newAudioNote = new audioNote({
        title: title,
        fileName: fileName,
        filePath: filePath,
        duration: duration,
        ampPath: ampPath,
        userId: req.userId
    })

    try {
        
        await newAudioNote.save();
        res.status(201).json(newAudioNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
}


const deleteAudioNote = async(req,res) =>{
    const id = req.params.id;
    try {
        
        const audio_note = await audioNote.findByIdAndDelete(id);
        res.status(202).json(audio_note);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
}

const getAudioNote = async (req,res) =>{

    try {
        
        const audio_note = await audioNote.find({userId: req.userId});
        res.status(200).json(audio_note);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }

}

module.exports = {
    createAudioNote,
    deleteAudioNote,
    getAudioNote
}