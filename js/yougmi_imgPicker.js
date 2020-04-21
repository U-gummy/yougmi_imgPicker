var yougmi_imgPicker = function(option){
    this.elId = option.elId;
    this.imgList = option.imgList;
    if(option.selected) {
        this.selected = option.selected;
    }
    if(!option.colCount) {
        option.colCount = 4;
    }
    this.colCount = option.colCount;
    this.insertAble = option.insertAble;

    // 이미지 마크업 함수
    this.mkup = function(){
        var html = ``;
        html += `<div class="yougmi_imgPicker_container"> 
        ${this.insertAble ? `<div class="input-box"><input type="file" multiple class="add-file"></div>` : ``}
                    <div class="image-list">`;
        for (var i in this.imgList){
            html += `
            <div class="img-area">
                <img src="${this.imgList[i]}">
            </div>
            `;
        }
        html += `</div></div>`;
        $(this.elId).append(html);
    }

    // 셀렉트 엑티브 이벤트 함수
    this.selectActive = function(){
        $(this.elId).find(".img-area").off("click");
        $(this.elId).find(".img-area").on("click",function(){
            $(this).toggleClass("selected");
        })
    }

    // 선택 이미지 경로 리턴 함수
    this.getSelected = function(){
        var selectImgList = [];
        $(".img-area.selected img").each(function(i,item){
            selectImgList.push($(item).attr("src"));
        })
        console.log('selectImgList: ', selectImgList);
        return selectImgList;
    };

    // 컬럼 갯수별 width 지정 함수
    this.colCountStyle = function(){
        $(this.elId).find(".img-area").css("width", 100 / this.colCount + "%");
    }

    // 파일 추가 등록 함수
    this.addFile = function(){
        var el = this.elId;
        var selector = this;
        $(".add-file").on("change",function(e){
            var html = ``;
            var fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = function(e) { 
                html += `
                <div class="img-area">
                    <img src="${e.target.result}">
                </div>
                `;
                $(el).find(".image-list").append(html);
                selector.colCountStyle();
                selector.selectActive();
            };
            $(".add-file").val("");
        })
    }


    this.init = function(){
        this.mkup(); // 이미지 마크업 함수
        this.selectActive(); // 셀렉트 엑티브 이벤트 함수
        this.colCountStyle(); // 컬럼 갯수별 width 지정 함수
        this.addFile(); // 파일 추가 등록 함수
    }
    
    this.init();
}   