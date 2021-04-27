let ac = {
  init : function () {
    ac.chr = document.getElementById("chr");
    ac.cmin = document.getElementById("cmin");
    ac.csec = document.getElementById("csec");

    ac.thr = ac.createSel(23);
    document.getElementById("tpick-h").appendChild(ac.thr);
    ac.thm = ac.createSel(59);
    document.getElementById("tpick-m").appendChild(ac.thm);
    ac.ths = ac.createSel(59);
    document.getElementById("tpick-s").appendChild(ac.ths);

    ac.tset = document.getElementById("tset");
    ac.tset.addEventListener("click", ac.set);
    ac.treset = document.getElementById("treset");
    ac.treset.addEventListener("click", ac.reset);

    ac.alarm = null;
    setInterval(ac.tick, 1000);
  },

  createSel : function (max) {
    let selector = document.createElement("select");
    for (let i=0; i<=max; i++) {
      let opt = document.createElement("option");
      i = ac.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector
  },

  padzero : function (num) {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  },

  tick : function () {
    let now = new Date();
    let hr = ac.padzero(now.getHours());
    let min = ac.padzero(now.getMinutes());
    let sec = ac.padzero(now.getSeconds());

    ac.chr.innerHTML = hr;
    ac.cmin.innerHTML = min;
    ac.csec.innerHTML = sec;



    let url = document.getElementById("url").value;
    url = url.match(/^http[s]?:\/\//) ? url : 'http://' + url;

    if (ac.alarm != null) {
      now = hr + min + sec;
      if (now == ac.alarm) {
        window.open(
          url, "_self");
      }
    }
  },

  set : function () {
    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;
  },

  reset : function () {
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;
    let url = document.getElementById("url");
    url.classList.remove("check");
    url.value("");
    document.getElementById("url").value = "";
  }
};

window.addEventListener("load", ac.init);
