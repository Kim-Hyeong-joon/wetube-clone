export const trending = (req, res) => res.render("home");

export const see = (req, res) => {
  console.log(req.params);
  return res.send("See Videos");
};
export const edit = (req, res) => {
  console.log(req.params);
  return res.send("Edit Videos");
};
export const search = (req, res) => res.send("Search Videos");
export const upload = (req, res) => res.send("Upload Videos");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Videos");
};
