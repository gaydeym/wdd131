let participantCount = 1;

function participantTemplate(count) {
    return `
    <section class="participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
            <label for="fname${count}">First Name<span>*</span></label>
            <input id="fname${count}" type="text" name="fname" required />
        </div>
        <div class="item activities">
            <label for="activity${count}">Activity #<span>*</span></label>
            <input id="activity${count}" type="text" name="activity" />
        </div>
        <div class="item">
            <label for="fee${count}">Fee ($)<span>*</span></label>
            <input id="fee${count}" type="number" name="fee" />
        </div>
        <div class="item">
            <label for="date${count}">Desired Date <span>*</span></label>
            <input id="date${count}" type="date" name="date" />
        </div>
        <div class="item">
            <p>Grade</p>
            <select>
                <option selected value="" disabled></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
            </select>
        </div>
    </section>
    `;
}

document.getElementById('add').addEventListener('click', function() {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    this.insertAdjacentHTML('beforebegin', newParticipantHTML);
});

function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    
    const total = feeElements.reduce((sum, element) => {
        return sum + Number(element.value || 0);
    }, 0);
    
    return total;
}

function successTemplate(info) {
    return `Thank you ${info.name} for registering. You have registered ${info.numParticipants} participant(s) and owe $${info.feeTotal} in Fees.`;
}

function submitForm(event) {
    event.preventDefault();
    
    // Get adult name
    const adultName = document.getElementById('adult_name').value;
    
    // Calculate fee total
    const feeTotal = totalFees();
    
    // Create info object
    const info = {
        name: adultName,
        numParticipants: participantCount,
        feeTotal: feeTotal
    };
    
    // Hide the form
    document.querySelector('form').style.display = 'none';
    
    // Show the summary with success message
    const summaryElement = document.getElementById('summary');
    summaryElement.textContent = successTemplate(info);
    summaryElement.style.display = 'block';
}

document.querySelector('form').addEventListener('submit', submitForm);
