// 쪽지 열기
function openNote(id) {
    document.getElementById(id).classList.remove('hide-note');
}

// 쪽지  닫기
function closeNote(id) {
    document.getElementById(id).classList.add('hide-note');
}

// 쪽지 답장하기 열기
function replyNote(modal_id, user_nickname) {
    document.getElementById(modal_id).classList.remove('hide-note');
    const modal = document.getElementById("recipient");
    modal.value = user_nickname;
    modal.readOnly = true;
}

// 쪽지 작성창 닫기
function closeWriteNote(modal_id) {
    if (confirm("쪽지 작성을 취소하시겠습니까?")) {
        document.getElementById(modal_id).classList.add('hide-note');
        document.getElementById("new-note-textarea").value = "";
    } else {
    return;
    }
}