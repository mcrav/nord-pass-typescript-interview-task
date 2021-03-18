import { FC, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';
import Modal from 'react-modal';

import './list-style.scss';

interface IList {
  // All password items
  items: Array<IItem>;
  // Callback for when password is updated
  onPasswordUpdate: Function;
}

interface IUpdateModal {
  // Password item being updated
  item: IItem;
  // Callback for when password is updated.
  onPasswordUpdate: Function;
}

/**
 * Modal allowing user to update password for specific password item.
 * If modal not open, just shows a button that will open the modal.
 */
const UpdateModal: FC<IUpdateModal> = ({ item, onPasswordUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={async () => {
              await updateItem({
                ...item,
                password: newPassword,
              });
              setNewPassword('');
              setShowModal(false);
              onPasswordUpdate();
            }}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setNewPassword('');
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

/**
 * List of all password items, with icon, title, description and button to
 * update password.
 */
const List: FC<IList> = ({ items, onPasswordUpdate }) => (
  <ul className="list">
    {items.map((item) => (
      <li className="item">
        <ItemIcon title={item.title} />
        <div>
          <div className="title">{item.title}</div>
          <div className="description">{item.description}</div>
        </div>
        <UpdateModal item={item} onPasswordUpdate={onPasswordUpdate} />
      </li>
    ))}
  </ul>
);

export default List;
