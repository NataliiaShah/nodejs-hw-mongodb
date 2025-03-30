export const uploadPhotoController = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No photo uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,  // Повертайте інформацію про файл
  });
};
