function getSecondLargest(nums) {
    // Complete the function
    let max=0;
    let second=0;
for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
        second = max;
        max = nums[i];
    }
    else if (nums[i] < max && nums[i] > second) {
        second = nums[i];

    }
}
return second;
}
