async function handleError(res, exec) {
  try {
    return await exec();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = handleError;
