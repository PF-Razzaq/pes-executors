// document.addEventListener("DOMContentLoaded", function () {
//   const TileType = document.getElementById("TileType");
//   const Tile = document.getElementById("Tile");

//   // Options for the dependent dropdown based on the main dropdown's value
//   const optionsMap = {
//     Big: ["Redland Mini Stonewold","Redland 49", "Redland Renown", "Redland Grovesbury", "Redland Double Roman"],
//     Small: ["Redland Concrete Plain", "Redland Concrete Plain Bonnet"],
//     Slate: ["Spainish Slate 500mm x 250mm", "Cedral Thrutone 600mm x 300mm"]
//   };

//   // Update the dependent dropdown options when the main dropdown changes
//   TileType.addEventListener("change", function () {
//     const selectedValue = TileType.value;
//     const subOptions = optionsMap[selectedValue] || [];

//     // Clear existing options
//     Tile.innerHTML = "";

//     // Add new options
//     subOptions.forEach(function (optionText) {
//       const option = document.createElement("option");
//       option.value = optionText;
//       option.textContent = optionText;
//       Tile.appendChild(option);
//     });
//   });
// });
