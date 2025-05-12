// この JavaScript ファイルは、フォールバックページ (wwwroot/index.html など) で
// script タグで読み込んでおきます。

(() => {

    // アイテムテンプレートによって自前で構築したコンボボックスアイテムのマスク要素に対するクリックイベントを処理します。
    const comboItemClickHandler = (event) => {

        // 未選択のアイテムであれば、これ以上、とくに何もせず既定の動作に任せます。
        const comboItem = event.target.parentElement;
        if (comboItem.ariaSelected !== "true") return;

        // もしも既に選択済みのアイテムであれば、マウスクリックイベントの伝達を止めて、既定の動作をキャンセル。
        // この選択済みアイテムが選択されたままを維持します。
        event.stopPropagation();

        // ただしこれででは、選択肢のドロップダウンリストが開きっぱなしになるので (マウスクリックイベントの伝達を阻止したため)、
        // 代わりに自前で ESC キー押下を模擬することで、ドロップダウンリストを閉じます。
        const keyEvent = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Escape", code: "Escape" });
        event.target.dispatchEvent(keyEvent);
    };

    igRegisterScript("comboItemTemplate", (context) => {

        // まずは普通にコンボボックスのアイテム要素を作成します。
        // なお、このサンプルプログラムでは、"Name" というプロパティを表示に使っています。
        // 適宜ご自身のプログラムに合せて参照するプロパティ名を変更してください。
        const contentElement = document.createElement("div");
        contentElement.textContent = context.item.Name;

        // さらに加えて、このコンボボックスアイテムのクリックイベントを捕捉するための、
        // コンボボックスアイテム全面を覆うマスク要素を作成し、クリックイベントハンドラを登録します。
        const maskElement = document.createElement("div");
        maskElement.style.position = "absolute";
        maskElement.style.inset = 0;
        maskElement.addEventListener("click", comboItemClickHandler, true);

        // このように作成した要素 x 2つを配列にして返します。
        return [contentElement, maskElement];
    }, false);
})();