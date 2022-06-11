export const getColor = (type) => {
  switch (type) {
    case "grass":
      return "#5eeeab";
    case "poison":
      return "#A33EA1";
    case "normal":
      return "#c1c09a";
    case "fire":
      return "#F8BF56";
    case "water":
      return "#88abf6";
    case "electric":
      return "#F7D02C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#c7d74c";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dark":
      return "#705746";
    case "dragon":
      return "#6F35FC";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
  }
};
