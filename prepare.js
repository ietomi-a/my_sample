const fs = require("fs");
const path = require("path");

// const tmp = 
// { 'images/0.jpg': 2500,
//   'images/1.jpg': 1100,
//   'images/2.jpg': 1500,
//   'images/3.jpg': 9800,
//   'images/4.jpg': 1500,
//   'images/5.jpg': 1500,
//   'images/6.jpg': 900,
//   'images/7.jpg': 1300,
//   'images/8.jpg': 1200,
//   'images/9.jpg': 1900 };

// console.log(tmp);
function main(){
  const dir_path = "images";
  const filenames = fs.readdirSync(dir_path);
  //console.log(filenames);
  let fpath_array = [];
  for( let fname of filenames ){
    fpath_array.push( path.join( dir_path, fname ) );
  }

  //console.log( fpath_array );
  const text = fpath_array.join("\n") + "\n"
  //console.log(text);
  fs.writeFileSync( "images.txt", text );
}

main();
