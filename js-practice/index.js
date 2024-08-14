// const obj1 = {first: 20, second: 30, first: 50};
// console.log(obj1);




// const example = ({ a, b, c }) => {
//     console.log(a, b, c);
//    };
//    example(0, 1, 2);

   function solve(arr, rotations){
    if(rotations == 0) return arr;
    for(let i = 0; i < rotations; i++){
      let element = arr.pop();
      arr.unshift(element);
    }
    console.log(arr)

    return arr;
   }
   solve([44, 1, 22, 111], 5);
   let n = 24;
let l = 0, r = 100, ans = n;
while(l <= r) {
   let mid = Math.floor((l + r) / 2);
   if(mid * mid <= n) {
       ans = mid;
       l = mid + 1;
   }
   else {
       r = mid - 1;
   }
}
console.log(ans);
