import MyReport from '../models/myreportsModel.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const reportUpload = async (req, res) => {
    try {
        const userId = req.id; // Assuming user ID is set by auth middleware
        const { symptoms, description } = req.body;
        const file = req.file;

        if (!symptoms || !description) {
            return res.status(400).json({
                success: false,
                message: 'Symptoms and description are required.'
            });
        }

        // Prepare report data
        const reportData = {
            userId,
            symptoms,
            description
        };
        if (file) {
            // Upload to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'reports',
                resource_type: 'auto',
            });
            reportData.fileUrl = uploadResult.secure_url;
            reportData.fileName = file.originalname;
            // Clean up local file
            fs.unlinkSync(file.path);
        }

        // Save the report
        const newReport = new MyReport(reportData);
        await newReport.save();

        res.json({
            success: true,
            message: 'Report uploaded successfully.',
            report: newReport
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
}

 export const getReports = async (req, res) => {
        try {
            const id = req.id;
            const reports = await MyReport.find({ userId: id }).sort({ createdAt: -1 });
            res.json({
                success: true,
                reports
            });
        } catch (error) {
            res.json({
                success: false,
                message: error.message,
            });
        }
    }
