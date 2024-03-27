import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './BookingDialogBox.css'

const BookingDetailsDialog = () => {
  return (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="px-2 py-1 bg-orange-400 rounded-e-md hover:bg-orange-300">Booking Details</button>
        </Dialog.Trigger>
        <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent flex justify-between items-start">
                <div className=''>
                    <h2 className='font-semibold'> Passenger Details</h2>
                    <div>
                        No Booking Found
                    </div>
                </div>
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}

export default BookingDetailsDialog
