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
                open={action.isDeleteComment}
                onClose={() => this.props.handleOpenDeleteCommnet(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Bạn có chắc muốn xóa comment`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {action.isDeleteComment ? action.comment.content : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleOpenDeleteCommnet(false)} autoFocus>Hủy</Button>
                    <Button onClick={() => this.props.handleDeleteComment()}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogDelete;