import styled  from 'styled-components'


export const FormStyled = styled.form<{ height?: string; width?: string }>(({ height, width }) => `
position: relative;
height:${height ? height : '600px'};
width: ${width ? width : '100%'};
`)

export const UploadStyled = styled.div<{ height?: string; width?: string; isFileAvailable?: boolean}>(({ height, width , isFileAvailable}) => `
    background-color : #ddd;
    border: 2px dashed ${isFileAvailable ? '#199FB1' : '#BB120E'};
    display: flex; 
    flex-direction : column ;
    justify-content : center; 
    align-items :  center ; 
    height:${height ? height : '600px'};
    width: ${width ? width : '100%'};
    transition : 0.5s ;

    & :hover{
        background-color :#ccc;
        transition : 0.5s ;
    }

`)

export const InputStyled = styled.input`
    display:none; 
`
export const LabelStyled = styled.label`
    cursor:pointer;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 10px;
    display: flex; 
    flex-direction : column ;
    justify-content : center; 
    align-items :  center ; 
    border-radius :10px;
    transition : 0.5s ;

    & :hover{
        background-color :#ccc;
        transition : 0.5s ;
    }
`
export const DragFilePosition = styled.div(() => `
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`)
export const ShowItemName = styled.div<{ width?: string }>(({ width }) => `
    display: flex; 
    flex-direction : column ;

    margin :5px 0;
    padding : 5px 10px; 
    width: ${width ? width : '100%'};
    display:flex;
    flex-direction : row ;
    justify-content : space-between;
    align-items : center ;

    .showitem-name{
        width:90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
    }
    .icon{
        color:#fff;

        & :hover
    }
`)  


export const ShowErrorFileUnderButton = styled.div`
width:100%,
height:  40px; 
background-color : #BB120E;
color : #fff;

`



