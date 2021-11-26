import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';


class DialogDelete extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { action } = this.props;
        return (
            <Dialog
                open={action.isDelete}
                onClose={this.props.handleCloseDialogDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Bạn có chắc muốn xóa post`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {action.isDelete ? action.post.title : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleCloseDialogDelete} autoFocus>Hủy</Button>
                    <Button  onClick={() => this.props.handleCloseDialogDeleteAndDelete(action.post.id)}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogDelete;