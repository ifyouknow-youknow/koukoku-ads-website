
export function randomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }

    return result;
}
export function removeDuplicatesByProperty(array, key) {
    const seen = new Set();
    return array.filter((item) => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        } else {
            seen.add(value);
            return true;
        }
    });
}
export function removeDuplicates(arr) {
    return [...new Set(arr)];
}
export function sortObjects(arr, property, direction = "asc") {
    return arr.slice().sort((a, b) => {
        if (a[property] < b[property]) {
            return direction === "asc" ? -1 : 1;
        }
        if (a[property] > b[property]) {
            return direction === "asc" ? 1 : -1;
        }
        return 0;
    });
}
export function swapObjects(arr, index1, index2) {
    if (index1 !== index2 && index1 >= 0 && index1 < arr.length && index2 >= 0 && index2 < arr.length) {
        const temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
    return arr;
}
//
export function formatDate(date) {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayName = daysOfWeek[date.getDay()];
    const monthName = monthsOfYear[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12 || 12;

    return `${dayName}, ${monthName} ${day}, ${year} ${hours}:${minutes} ${period}`;
}
export function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert hours and minutes to strings
    const hoursString = hours.toString();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${hoursString}:${minutesString}`;
}
//
export const scrollToAnchor = (id) => {
    const anchor = document.getElementById(`${id}`);
    if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" });
    }
};


// SERVER
export function server_PostAPI(endpoint, args, setter) {
    const body = { ...args };
    const url = `https://nothingbagel.com/${endpoint}`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response:", data);
            if (setter) {
                setter(data);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
