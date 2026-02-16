const authInternal = (req, res, next) => {
    const key = req.headers['internal-key'];
    if (key !== process.env.INTERNAL_SECRET) {
        return res.status(403).json({ message: "Brak dostępu" });
    }
    next();
};

export default authInternal;