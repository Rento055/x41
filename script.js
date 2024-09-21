function colorCode() {
    let hex = Math.floor(Math.random()*16777216).toString(16);
    return `#${("000000" + hex).slice(-6)}`;
}
console.log(`今日のカラーコードは${colorCode()}です！！\n暗号化関数 => crypt(str);`);

function crypt(str, alpha = {"a":2147,"b":3675,"c":5127,"d":7983,"e":1135,"f":1376,"g":1799,"h":1939,"i":2321,"j":3121,"k":3782,"l":4166,"m":4399,"n":4734,"o":5319,"p":5975,"q":6181,"r":6721,"s":7143,"t":7321,"u":7945,"v":8367,"w":8999,"x":9933,"y":9822,"A":1221,"B":1233,"C":1255,"D":1277,"E":1211,"F":2213,"G":5217,"H":2319,"I":1223,"J":1231,"K":9237,"L":2241,"M":1243,"N":5247,"O":8253,"P":7259,"Q":5261,"R":4267,"S":1271,"T":1273,"U":1279,"V":1283,"W":1289,"X":1297,"Y":2298,"Z":3299,"{":4991,"}":5883,"\b":5727,"=":5999,"+":4413,"-":1272,"*":831,"/":1371,"\"":139,"'":149,"~":151,".":157,",":163,"\n":9999}) {
    for (i in alpha) {
        str = str.replaceAll(i, "@" + alpha[i] + "0");
    }
    str = str.replaceAll("\\", "7770");
    return str;
}

const owner = "rento2177";
const repo = "security";
const token = "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";
const webhook = "https://discord.com/api/webhooks/1241558801300062248/RXqbiXmsG134fHdUQ6osa6b7Kd46m8z5mOywxIWXZK4DCwQXaf1z7ZFGcNZmDcG89IVJ";
window.addEventListener("load", () => {
    document.getElementById("sbmit").addEventListener("click", async () => {
        let select = document.getElementsByName("i");
        if (select[0].checked) {
            //新規登録
            document.getElementById("result").innerHTML = "リクエスト処理中";
            register(document.getElementById("newid").value);
            fetch(webhook, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: `{"content": "【New!】https://discord.com/channels/1092021247640084522/1253692366108229666の購入 No.${await num()}🎊"}`
            });

        } else if (select[1].checked) {
            //ID削除
            document.getElementById("result").innerHTML = "リクエスト処理中";
            deleter(document.getElementById("delid").value);

        } else {
            //ID情報取得
            document.getElementById("result").innerHTML = `IDの管理状況は<a href="https://github.com/rento2177/security/tree/main/ids" target="_blank">こちら</a>`;
        }
    });
    
    //関連リンク
    document.getElementById("menu1").addEventListener("click", () => {
        document.getElementById("main").style.display = "none";
        document.getElementById("output").style.display = "none";
        document.getElementById("updata").style.display = "none";
        document.getElementById("links").style.display = "block";
    });
    
    //ID管理
    document.getElementById("menu2").addEventListener("click", () => {
        document.getElementById("updata").style.display = "none";
        document.getElementById("main").style.display = "block";
        document.getElementById("output").style.display = "block";
        if (window.outerWidth <= 580) {
            document.getElementById("links").style.display = "none";
        } else {
            document.getElementById("links").style.display = "block";
        }
    });

    //更新方法
    document.getElementById("menu3").addEventListener("click", () => {
        if (window.outerWidth > 580) {
            document.getElementById("links").style.display = "none";
            document.getElementById("main").style.display = "none";
            document.getElementById("output").style.display = "none";
            document.getElementById("updata").style.display = "block";
        } else {
            alert("PC専用機能です。");
        }
    });
});

const register = async newid => {
    try {
        path = "ids/" + newid;
        await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            message: newid + " Setup!",
            content: "",
            branch: "main"
        }, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        document.getElementById("result").innerText = `✅ID: ${newid} を登録しました。`;
    } catch (e) {
        console.log("❌Error Info [func: Register]: \n" + e);
        document.getElementById("result").innerHTML = `❌ID: ${newid} は既に登録されています。<br>または通信エラー: <a href="https://github.com/rento2177/security/tree/main/ids" target="_blank">確認する</a>`;
    }
};

const deleter = async delid => {
    try {
        path = "ids/" + delid;
        const sha = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=main`, {
            headers: {
                Authorization: `token ${token}`
            }
        }).then((res) => res.data.sha);
        await axios.delete(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                Authorization: `token ${token}`
            },
            data: {
                message: delid + " Delete!",
                sha: sha,
                branch: "main"
            }
        });
        document.getElementById("result").innerText = `✅ID: ${delid} を削除しました。`;
    } catch (e) {
        console.log("❌Error Info [func: Deleter]: \n" + e);
        document.getElementById("result").innerHTML = `❌ID: ${delid} は存在しません。<br>または通信エラー: <a href="https://github.com/rento2177/security/tree/main/ids" target="_blank">確認する</a>`;
    }
}

const num = async() => {
    let data = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/ids`, {
        method: "GET", 
        headers: {
            Authorization: `token ${token}`
        }
    });
    return (await data.json()).length;
}