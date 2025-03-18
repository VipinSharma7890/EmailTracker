if (localStorage.getItem("username")) {
    document.querySelector("ul").innerHTML =
        `<li><a href="./index.html">Home</a></li>
                <li><a href="./email_send.html">Compose</a></li>
                <li><a href="./email_draft.html">Drafts</a></li>
                <li><a href="./email_sent_dashboard.html">Dashboard</a></li>
                <li><a href="#" class="logout">Logout</a></li>
                `;

}
else{
    window.location.href="./email_login.html";
}


// document.querySelector(".user-menu").addEventListener("mouseenter",()=>{
//     document.querySelector(".email-list").style="z-index:-2";
// })
// document.querySelector(".user-menu").addEventListener("mouseleave",()=>{
//     document.querySelector(".email-list").style="z-index:0";
// })

let website_url="https://emailtracker.up.railway.app";
let emails = [];

// Load Emails into List
const emailContainer = document.getElementById("emailContainer");


let currentPage = 1;
const itemsPerPage = 5;

function displayEmails() {
    emailContainer.innerHTML = ""; // Clear existing emails

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedEmails = emails.slice(start, end);

    paginatedEmails.forEach((email) => {
        if (email.id === 0) return;

        let emailItem = document.createElement("li");
        emailItem.classList.add("email-item");
        emailItem.innerHTML = `
        <div style="display:flex; flex-direction:column;">
            <div style="margin-bottom:20px; font-size:18px"><strong>Subject:</strong> ${email.subject}</div>
            <div style="font-size:14px"><strong>To:</strong> ${email.senderAddress} </div> 
            <div style="font-size:14px"><strong>From:</strong> ${email.receiverAddress} </div>
            <br>
            <div class="email-date-time" style="display:flex;justify-content:space-between"> 
                <div style="font-size:14px"><strong>Delivered at:</strong> ${changeFormatDate(email.delivered)}</div> 
                <div style="font-size:14px"><strong>Last opened:</strong> ${getTimeSince(email.opened)}</div> 
            </div>
        </div>
        <br><br>
        <div class="email-status">
            <div class="status ${email.exist ? 'exist-yes' : 'exist-no'}">Exists: ${email.exist ? '✔' : '✖'}</div>
            <div class="status ${email.delivered ? 'delivered-yes' : 'delivered-no'}">Delivered: ${email.delivered ? '✔' : '✖'}</div>
            <div class="status ${email.opened ? 'opened-yes' : 'opened-no'}">Opened: ${email.opened ? '✔' : '✖'}</div>
        </div>`;
        emailItem.onclick = () => open_mail(email.id);
        emailContainer.appendChild(emailItem);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(emails.length / itemsPerPage);
    const pageNumbersContainer = document.getElementById("pageNumbers");
    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.onclick = () => goToPage(i);
        if (i === currentPage) {
            button.classList.add("active");
        }
        pageNumbersContainer.appendChild(button);
    }

    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

function changePage(step) {
    currentPage += step;
    displayEmails();
}

function goToPage(page) {
    currentPage = page;
    displayEmails();
}

// Load Emails and Apply Pagination
let load = async () => {
    await fetch(website_url + "/get-mails/1?sender=" + localStorage.getItem("username"))
        .then(res => res.json())
        .then(result => emails = result);

    displayEmails();
};

load();



let open_mail=(id)=>{
    window.location.href=`./email_send.html?message-id=${id}`;
}

load();



document.querySelector(".logout").addEventListener("click",()=>{
    const popup = document.getElementById('logout-popup');


    popup.classList.add('show');
    setTimeout(() => {
       

        popup.classList.remove('show');
 
        window.location.href="./logout.html"
     }, 5000); 
})




function changeFormatDate(javaDateString) {
    if (javaDateString == null) {
        return "not delivered";
    }

    let date = new Date(javaDateString);

    // Convert to UTC
    let day = date.getUTCDate().toString().padStart(2, '0'); // 01-31
    let month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }); // Jan, Feb, etc.
    let year = date.getUTCFullYear(); // YYYY
    let hours = date.getUTCHours().toString().padStart(2, '0'); // 00-23
    let minutes = date.getUTCMinutes().toString().padStart(2, '0'); // 00-59

    return `${day} ${month} ${year} at ${hours}:${minutes} UTC`;
}





function getTimeSince(javaDateString){
    if(javaDateString==null){
        return "not opened";
    }
    let pastDate = new Date(javaDateString); // Convert Java date string to JavaScript Date
    let currentDate = new Date(); // Get current date

    let diffMs = currentDate - pastDate; // Difference in milliseconds

    let seconds = Math.floor(diffMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day(s) ago`;
    } else if (hours > 0) {
        return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
        return `${minutes} minute(s) ago`;
    } else {
        return `${seconds} second(s) ago`;
    }
}
