// @mui
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';

import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
// utils
// eslint-disable-next-line import/no-unresolved
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------
const AnyReactComponent = ({ text }) => <div>{text}</div>;

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: window.innerWidth - '100',
  p: 4,
  borderRadius: 4,
  outline: 'none',
  overflowY: 'scroll',
  height: '95%',
  display: 'block',
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  const handleViewAll = () => {
    window.location.href = 'all-blog';
  };

  const URL = window.location.href;
  // get path name
  const pathName = URL.split('/');
  // get last path name
  const lastPathName = pathName[pathName.length - 1];
  // get last path name

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      {lastPathName === 'all-blog' ? null : (
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            onClick={handleViewAll}
            size="small"
            color="inherit"
            endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
          >
            View all
          </Button>
        </Box>
      )}
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const {
    image,
    title,
    description,
    postedAt,
    solution,
    length,
    width,
    type,
    material,
    start,
    end,
    speed,
    condition,
    feature,
    accident1,
    accident2,
    accident3,
    accident4,
  } = news;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    getCoords();
  };
  const handleClose = () => setOpen(false);

  const [coords, setCoords] = useState({ lat: 10.8124974, lng: 106.6161661 });

  const getCoords = async () => {
    const results = await geocodeByAddress(title);
    const latLng = await getLatLng(results[0]);
    console.log('Success', latLng);
    setCoords(latLng);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link onClick={handleOpen} color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
              Thông tin đoạn đường nguy hiểm
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Đoạn đường
                    </TableCell>
                    <TableCell align="left">{title}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Thông tin cảnh báo
                    </TableCell>
                    <TableCell align="left">{description}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Các giải pháp an toàn
                    </TableCell>
                    <TableCell align="left">{solution}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Thời gian cập nhật
                    </TableCell>
                    <TableCell align="left">{fToNow(postedAt)}</TableCell>
                  </TableRow>
                </TableBody>

                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2, mt: 4 }}>
                  Thống kê số lượng tai nạn giao thông ở đoạn đường này
                </Typography>

                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tai nạn va chạm
                    </TableCell>
                    <TableCell align="left">{accident1} vụ</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tai nạn liên quan đến người đi bộ
                    </TableCell>
                    <TableCell align="left">{accident2} vụ</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tai nạn do quá tải
                    </TableCell>
                    <TableCell align="left">{accident3} vụ</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tai nạn do lái xe mệt mỏi
                    </TableCell>
                    <TableCell align="left">{accident4} vụ</TableCell>
                  </TableRow>
                </TableBody>

                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2, mt: 4 }}>
                  Thông tin chi tiết
                </Typography>

                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Chiều dài đoạn đường
                    </TableCell>
                    <TableCell align="left">{length}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Chiều rộng đoạn đường
                    </TableCell>
                    <TableCell align="left">{width}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Loại đường
                    </TableCell>
                    <TableCell align="left">{type}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Vật liệu xây dựng đường
                    </TableCell>
                    <TableCell align="left">{material}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Điểm đầu và điểm cuối
                    </TableCell>
                    <TableCell align="left">
                      Điểm đầu: {start}
                      <br />
                      Điểm cuối: {end}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tốc độ giới hạn
                    </TableCell>
                    <TableCell align="left">{speed}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Điều kiện đường
                    </TableCell>
                    <TableCell align="left">{condition}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Các đặc điểm khác
                    </TableCell>
                    <TableCell align="left">{feature}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2, mt: 4 }}>
              Bản đồ
            </Typography>

            <div style={{ height: '500px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBfrr68LOR85piDHsa6trV9o5pJwB6gVgU' }}
                defaultZoom={15}
                center={coords}
              >
                <AnyReactComponent
                  lat={coords.lat}
                  lng={coords.lng}
                  text={
                    <div style={{ color: 'red', fontSize: '20px' }}>
                      <img
                        style={{ width: '30px', height: '30px', transform: 'translate(-50%, -50%)' }}
                        src="../assets/icons/pngegg.png"
                        alt="pngegg"
                        border="0"
                      />
                    </div>
                  }
                />
              </GoogleMapReact>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
                Đóng
              </Button>
              {/* <Button variant="contained" sx={{ bgcolor: 'primary.main', color: 'common.white' }}>
      Lưu
    </Button> */}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
}
