// =========================
// H.E.E. AUDIO ENGINE
// =========================

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Tiny typing click
function playType(){

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = 900 + Math.random()*250;

    gain.gain.value = 0.015;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 0.02
    );

    osc.stop(audioCtx.currentTime + 0.02);
}

// Computer beep
function playBeep(){

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = 700;

    gain.gain.value = 0.06;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 0.18
    );

    osc.stop(audioCtx.currentTime + 0.18);
}

// Static glitch
function playGlitch(){

    const buffer = audioCtx.createBuffer(
        1,
        audioCtx.sampleRate * 0.2,
        audioCtx.sampleRate
    );

    const data = buffer.getChannelData(0);

    for(let i=0;i<data.length;i++){
        data[i]=(Math.random()*2-1)*0.25;
    }

    const source = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();

    source.buffer = buffer;

    gain.gain.value = 0.08;

    source.connect(gain);
    gain.connect(audioCtx.destination);

    source.start();
}

// Loud interruption burst
function playInterrupt(){

    const buffer = audioCtx.createBuffer(
        1,
        audioCtx.sampleRate * 0.5,
        audioCtx.sampleRate
    );

    const data = buffer.getChannelData(0);

    for(let i=0;i<data.length;i++){

        data[i]=(Math.random()*2-1);

        data[i]*=(1-i/data.length);
    }

    const source = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();

    source.buffer = buffer;
    gain.gain.value = 0.22;

    source.connect(gain);
    gain.connect(audioCtx.destination);

    source.start();
}
