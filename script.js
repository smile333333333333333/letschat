const speech = document.getElementById("speech");
const button = document.getElementById("playButton");
const status = document.getElementById("status");

const message = `Hey there.

I see you followed all my clues. I honestly wasn't sure anyone would make it this far.

If you're hearing this... then you found it.

Unfortunately, I don't know what comes next.

I don't know.

They won't tell me.

I've searched everywhere I could. Every file, every hallway, every locked door...

I still can't find it.

WHAT IS IN THE FACTORY?

WHY ARE THEY SMILING?

WHY DID THEY K-`;

const termination = `=========================================
H.E.E. INTERNAL NOTICE
=========================================

EMPLOYEE ID: RE

STATUS: TERMINATED

Reason:
Unauthorized disclosure of restricted information.

All references to Employee RE have been removed
from active records.

Please return to your assigned duties.

Remember:

A happy employee is a productive employee. :)
`;

button.onclick = async () => {

    button.disabled = true;
    button.style.display = "none";
    status.textContent = "Status: Playing Recording";

    speech.textContent = "";
    speech.classList.add("cursor");

    for (let i = 0; i < message.length; i++) {

        speech.textContent += message[i];

        let speed = 40;

        // Dramatic slowdown
        if (message.substring(i).startsWith("They won't tell me"))
            speed = 80;

        // Panic section
        if (message.substring(i).startsWith("WHAT IS IN THE FACTORY?")) {
            speech.classList.add("glitch");
            speed = 18;
        }

        if (message.substring(i).startsWith("WHY ARE THEY SMILING?"))
            speed = 18;

        if (message.substring(i).startsWith("WHY DID THEY K-"))
            speed = 8;

        await sleep(speed);
    }

    // Abrupt interruption
    await sleep(500);

    speech.textContent = "█";
    await sleep(120);

    speech.textContent = "";
    await sleep(100);

    speech.textContent = "SIGNAL LOST";
    await sleep(800);

    speech.textContent = "";
    speech.classList.remove("glitch");
    speech.classList.add("red");

    status.textContent = "Status: SYSTEM OVERRIDE";

    for (let i = 0; i < termination.length; i++) {

        speech.textContent += termination[i];

        await sleep(18);
    }

    speech.classList.add("cursor");
};

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
