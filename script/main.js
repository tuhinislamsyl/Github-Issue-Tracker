const spinner = document.getElementById("loading");
const issueTitle = document.getElementById("modal-title");
const issueDescription = document.getElementById("modal-description");
const issuelabelContainer = document.getElementById("modal-labels");
const issueContent = document.getElementById("modal-content");
const issueAssignee = document.getElementById("modal-assignee-name");
const issuePriority = document.getElementById("modal-priority");
const issuebutton = document.getElementById("modal-button");
let issueDetailsModal = document.getElementById("issueDetailsModal");
const modal = document.getElementById("modal");
// console.log(modal);

//toggle button 

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closed = document.getElementById("closed");


function btnController(button) {

    const buttons = [allBtn, openBtn, closed];

    buttons.forEach(btn => {
        btn.classList.remove("bg-[#6000FF]", "text-white");
        btn.classList.add("text-gray-500");
    });

    button.classList.remove("text-gray-500");
    button.classList.add("bg-[#6000FF]", "text-white");

}


async function issues() {
    spinner.classList.remove("hidden");
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);
    renderIssueCards(data.data);
    spinner.classList.add("hidden");
}

let count = 1;

function renderIssueCards(issueList) {
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    count = 1;
    displayIssues(issueList);

    const issueCounter = document.getElementById("issue-counter");
    issueCounter.innerHTML = issueList.length;
    // console.log(issueList.length);
}

function displayIssues(issues) {
    // console.log(issues);
    issues.forEach((issue) => {
        const card = document.createElement("div");
        card.classList.add("issue-card");
        card.dataset.status = issue.status;
        card.dataset.issueId = issue.id;
        let unique = count++;
        card.innerHTML = `${issue.status === "open" ? `<div onclick="openModal('${issue.id}')" class="card bg-base-100 p-0 bg-white rounded-2xl border-t-4 border-t-[#00A96E]">
                    <div class="p-3 h-72">
                        <figure class="flex justify-between">
                            <img src="./assets/Open-Status.png"/>
                            <div id="priority-btn"></div>
                        </figure>
                        <div class="mt-3">
                        
                            <h2 class="card-title">${issue.title}</h2>
                            <p class="line-clamp-2">${issue.description}
                            </p>
                            <div class="card-actions justify-start mt-3 flex" id="label-buttons">

                            </div>
                        </div>
                    </div>

                    <div class="border-2 border-[#F8FAFC]"></div>

                    <div class=" rounded-2xl p-3 h-22 flex justify-between ">
                        <div>
                            <p>#${unique} ${issue.author}</p>
                            <p>${issue.assignee}</p>
                        </div>
                        <div>
                            <p>${issue.createdAt.slice(0, 10)}</p>
                            <p>updated: ${issue.updatedAt.slice(0, 10)}</p>
                        </div>
                    </div>
                </div>`: `<div onclick="openModal('${issue.id}')" class="card bg-base-100 p-0 bg-white rounded-2xl border-t-4 border-t-[#A855F7]">
                    <div class="p-3 h-72">
                        <figure class="flex justify-between">
                            <img src="./assets/Closed- Status .png"/>
                            <div id="priority-btn"></div>
                        </figure>
                        <div class="mt-3">
                            <h2 class="card-title">${issue.title}</h2>
                            <p class="line-clamp-2">${issue.description}
                            </p>
                            <div class="card-actions justify-start mt-3 flex" id="label-buttons">

                            </div>
                        </div>
                    </div>

                    <div class="border-2 border-[#F8FAFC]"></div>

                    <div class=" rounded-2xl p-3 h-22 flex justify-between ">
                        <div>
                            <p>#${unique} ${issue.author}</p>
                            <p> ${issue.assignee}</p>
                        </div>
                        <div>
                            <p>${issue.createdAt.slice(0, 10)}</p>
                            <p>updated: ${issue.updatedAt.slice(0, 10)}</p>
                        </div>
                    </div>
                </div>`}`

        const labelContainer = card.querySelector("#label-buttons");
        issue.labels.forEach(label => {
            labelContainer.appendChild(labelCheker(label));
        })
        const priorityBtn = card.querySelector("#priority-btn");
        // console.log(priorityBtn)
        const priorityBtnElement = issue.priority;
        // console.log(priorityBtnElement)
        priorityBtn.appendChild(priorityBtnSelector(issue.priority));

        const target = document.getElementById("cards");
        target.appendChild(card);
    })
}

function applyStatusFilter(status) {
    const allCards = document.querySelectorAll("#cards .issue-card");
    let visibleCount = 0;

    allCards.forEach((card) => {
        const isVisible = status === "all" || card.dataset.status === status;
        card.style.display = isVisible ? "block" : "none";
        if (isVisible) {
            visibleCount++;
        }
    });

    // Counter ta update kortesi eikhane 
    const issueCounter = document.getElementById("issue-counter");
    issueCounter.innerHTML = visibleCount;
}
function showAll() {
    applyStatusFilter("all");
}

function showOpen() {
    applyStatusFilter("open");
}

function showClose() {
    applyStatusFilter("closed");
}

function labelCheker(label) {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-soft", "rounded-4xl");

    if (label === "bug") {
        btn.innerHTML = `<i class="fa-solid fa-bug"></i> BUG`;
        btn.classList.add("btn-secondary");
    } else if (label === "help wanted") {
        btn.innerHTML = `<i class="fa-brands fa-hire-a-helper"></i> HELP WANTED`;
        btn.classList.add("btn-warning");
    } else if (label === "enhancement") {
        btn.innerHTML = `<i class="fa-solid fa-star" style="color: rgb(0, 169, 110);"></i> ENHANCEMENT`;
        btn.classList.add("btn-success");
    }
    else if (label === "documentation") {
        btn.innerHTML = `<i class="fa-brands fa-readme" style="color: rgb(80, 94, 190);"></i> Documentation`;
        btn.classList.add("btn-primary");
    }
    else if (label === "good first issue") {
        btn.innerHTML = `<i class="fa-solid fa-thumbs-up" style="color: rgb(80, 142, 190);"></i> GOOD FIRST ISSUE`;
        btn.classList.add("btn-info");
    }

    return btn;
}



function priorityBtnSelector(priority) {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-soft", "rounded-4xl");
    if (priority === "high") {
        btn.innerHTML = `HIGH`;
        btn.classList.add("btn-secondary")
    } else if (priority === "medium") {
        btn.innerHTML = `Medium`;
        btn.classList.add("btn-warning")
    } else if (priority === "low") {
        btn.innerHTML = `LOW`;
        btn.classList.add("default")
    }
    return btn;
}

async function openModal(issueId) {
    // console.log(issueId);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await res.json();
    const issueDetail = data.data;
    // console.log(issueDetail.title);

    issueDetailsModal.showModal();
    dialog = `<div class="modal-box">
    <h1 class="font-bold" id="modal-title">${issueDetail.title}</h1>
    <div id="modal-description" class="flex gap-2 items-center justify-start">
        <div id="modal-status">${openCloseBtn(issueDetail.status)}</div>
        <div class="border h-1 w-1 rounded-2xl border-[#64748B]"></div>
        <div>
            <p>${issueDetail.author}</p>
        </div>
        <div class="border h-1 w-1 rounded-2xl border-[#64748B]"></div>
        <div>
            <p>${issueDetail.createdAt.slice(0, 10)}</p>
        </div>
    </div>
    <div id="modal-label" class="my-6">

    </div>
    <div>
        <p id="modal-content">${issueDetail.description}</p>
    </div>
    <div class="flex justify-between p-4 bg-[#F8FAFC] rounded-2xl my-6">
        <div>
            <p>Assignee: </p>
            <p id="modal-assignee-name">${issueDetail.assignee}</p>
        </div>
        <div id="modal-priority-container">
            <p id="modal-priority">Priority:</p>
            ${priorityBtnSelector(issueDetail.priority).outerHTML}
        </div>
    </div>
    <div class="flex justify-end">
        <button class="btn btn-primary" onclick="issueDetailsModal.close()">Close</button>
    </div>
</div>`

    issueDetailsModal.innerHTML = dialog;

    function openCloseBtn(status) {
        if (status === "open") {
            return `<button class="btn btn-soft rounded-4xl btn-success">Open</button>`;
        }
        return `<button class="btn btn-soft rounded-4xl btn-primary">Closed</button>`;
    }

    issueDetail.labels.forEach(label => {
        const labelContainer = document.getElementById("modal-label");
        labelContainer.appendChild(labelCheker(label));
    });

}

const searchInput = document.getElementById("input-text");
// console.log(searchInput);

searchInput.addEventListener("input", async function () {
    const keyword = searchInput.value.trim();

    if (!keyword) {
        await issues();
        return;
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${keyword}`);
    const data = await res.json();

    renderIssueCards(data.data);
    
});

issues();