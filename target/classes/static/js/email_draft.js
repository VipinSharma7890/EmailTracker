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

let website_url="http://localhost:8080";
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
        if (email.id === 0 || email.exist!=null) return;

        console.log(email.exist)
        console.log(email.exist)
        let emailItem = document.createElement("li");
        emailItem.classList.add("email-item");
        emailItem.innerHTML = `
        <div style="display:flex; flex-direction:column;">
            <div style="margin-bottom:20px; font-size:18px"><strong>Subject:</strong> ${email.subject}</div>
            <div style="font-size:14px"><strong>To:</strong> ${email.senderAddress} </div> 
            <div style="font-size:14px"><strong>From:</strong> ${email.receiverAddress} </div>
            <br>
            <div class="email-date-time" style="display:flex;justify-content:space-between">
                <div style="font-size:14px"><strong>Draft Created at:</strong> ${changeFormatDate(email.created)}</div> 
                 
            </div>
            <br>
            
            
        </div>`
        ;
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
    await fetch(website_url + "/get-mails/0?sender=" + localStorage.getItem("username"))
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




function changeFormatDate(javaDateString){

    if(javaDateString==null){
        return "not delivered"
    }

    let date = new Date(javaDateString);

    // Format the date
    let day = date.getDate().toString().padStart(2, '0'); // 01-31
    let month = date.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, etc.
    let year = date.getFullYear(); // YYYY
    let hours = date.getHours().toString().padStart(2, '0'); // 00-23
    let minutes = date.getMinutes().toString().padStart(2, '0'); // 00-59

    return `${day} ${month} ${year} at ${hours}:${minutes}`;
}