// ���� JavaScript �t�@�C���́A�t�H�[���o�b�N�y�[�W (wwwroot/index.html �Ȃ�) ��
// script �^�O�œǂݍ���ł����܂��B

(() => {

    // �A�C�e���e���v���[�g�ɂ���Ď��O�ō\�z�����R���{�{�b�N�X�A�C�e���̃}�X�N�v�f�ɑ΂���N���b�N�C�x���g���������܂��B
    const comboItemClickHandler = (event) => {

        // ���I���̃A�C�e���ł���΁A����ȏ�A�Ƃ��ɉ�����������̓���ɔC���܂��B
        const comboItem = event.target.parentElement;
        if (comboItem.ariaSelected !== "true") return;

        // ���������ɑI���ς݂̃A�C�e���ł���΁A�}�E�X�N���b�N�C�x���g�̓`�B���~�߂āA����̓�����L�����Z���B
        // ���̑I���ς݃A�C�e�����I�����ꂽ�܂܂��ێ����܂��B
        event.stopPropagation();

        // ����������łł́A�I�����̃h���b�v�_�E�����X�g���J�����ςȂ��ɂȂ�̂� (�}�E�X�N���b�N�C�x���g�̓`�B��j�~��������)�A
        // ����Ɏ��O�� ESC �L�[������͋[���邱�ƂŁA�h���b�v�_�E�����X�g����܂��B
        const keyEvent = new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Escape", code: "Escape" });
        event.target.dispatchEvent(keyEvent);
    };

    igRegisterScript("comboItemTemplate", (context) => {

        // �܂��͕��ʂɃR���{�{�b�N�X�̃A�C�e���v�f���쐬���܂��B
        // �Ȃ��A���̃T���v���v���O�����ł́A"Name" �Ƃ����v���p�e�B��\���Ɏg���Ă��܂��B
        // �K�X�����g�̃v���O�����ɍ����ĎQ�Ƃ���v���p�e�B����ύX���Ă��������B
        const contentElement = document.createElement("div");
        contentElement.textContent = context.item.Name;

        // ����ɉ����āA���̃R���{�{�b�N�X�A�C�e���̃N���b�N�C�x���g��ߑ����邽�߂́A
        // �R���{�{�b�N�X�A�C�e���S�ʂ𕢂��}�X�N�v�f���쐬���A�N���b�N�C�x���g�n���h����o�^���܂��B
        const maskElement = document.createElement("div");
        maskElement.style.position = "absolute";
        maskElement.style.inset = 0;
        maskElement.addEventListener("click", comboItemClickHandler, true);

        // ���̂悤�ɍ쐬�����v�f x 2��z��ɂ��ĕԂ��܂��B
        return [contentElement, maskElement];
    }, false);
})();