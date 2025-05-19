function t(){return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,r=>(+r^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+r/4).toString(16))}export{t as u};
