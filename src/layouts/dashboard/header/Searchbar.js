import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  Stack,
  Box,
  Typography,
  Modal,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import styles from './Searchbar.module.css';
import { fToNow } from '../../../utils/formatTime';

import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../components/iconify';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

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

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const ROAD = [
    {
      id: 0,
      road: 'S1',
      district: 'Tân Phú',
      city: 'Hồ Chí Minh',
      description: 'Đoạn đường này có nhiều xe máy, xe ô tô',
      image: '/assets/images/covers/cover_1.jpg',
      postedAt: '2021-10-10',
      position: [{ lat: 10.79, lng: 106.67 }],
      solution: 'Giảm tốc độ khi đi qua đoạn đường này',
      length: '5000m',
      width: '5m',
      type: 'Đường bộ',
      material: 'Đường nhựa',
      start: '10.823, 106.629',
      end: '10.823, 106.629',
      speed: '50km/h',
      condition: 'Không',
      feature: 'Nhiều học sinh vào giờ cao điểm',
      accident1: 2,
      accident2: 4,
      accident3: 5,
      accident4: 4,
    },
    {
      id: 1,
      road: 'Nguyễn Văn Linh',
      district: '7',
      city: 'Hồ Chí Minh',
      description: 'Đoạn đường này rộng và thông thoáng, có nhiều cao ốc',
      image: '/assets/images/covers/cover_2.jpg',
      postedAt: '2022-01-01',
      solution: 'Giảm tốc độ khi đi qua đoạn đường này',
      length: '5000m',
      width: '5m',
      type: 'Đường bộ',
      material: 'Đường nhựa',
      start: '10.823, 106.629',
      end: '10.823, 106.629',
      speed: '50km/h',
      condition: 'Không',
      feature: 'Nhiều học sinh vào giờ cao điểm',
      accident1: 2,
      accident2: 4,
      accident3: 5,
      accident4: 4,
    },
    {
      id: 2,
      road: 'Phạm Văn Đồng',
      district: 'Cầu Giấy',
      city: 'Hà Nội',
      description: 'Đoạn đường này gần các trường đại học, có nhiều quán ăn',
      image: '/assets/images/covers/cover_3.jpg',
      postedAt: '2022-02-14',
      solution: 'Giảm tốc độ khi đi qua đoạn đường này',
      length: '5000m',
      width: '5m',
      type: 'Đường bộ',
      material: 'Đường nhựa',
      start: '10.823, 106.629',
      end: '10.823, 106.629',
      speed: '50km/h',
      condition: 'Không',
      feature: 'Nhiều học sinh vào giờ cao điểm',
      accident1: 2,
      accident2: 4,
      accident3: 5,
      accident4: 4,
    },
    {
      road: 'Tô Ký',
      district: '12',
      city: 'Hồ Chí Minh',
      description: 'Đoạn đường thường xảy ra tai nạn',
      solution: 'Giảm tốc độ khi đi qua đoạn đường này',
      length: '5000m',
      width: '5m',
      type: 'Đường bộ',
      material: 'Đường nhựa',
      start: '10.823, 106.629',
      end: '10.823, 106.629',
      speed: '50km/h',
      condition: 'Không',
      feature: 'Nhiều học sinh vào giờ cao điểm',
      postedAt: '2023-04-13T13:12:23.413Z',
      image: '/assets/images/covers/cover_24.jpg',
      accident1: 2,
      accident2: 4,
      accident3: 5,
      accident4: 4,
    },
    {
      road: 'Võ Văn Kiệt',
      district: ' Bình Tân',
      city: 'Hồ Chí Minh',
      description: ' Có tình hình giao thông phức tạp và tỷ lệ tai nạn giao thông xảy ra cao',
      solution: 'Đồng loạt ra quân thực hiện các giải pháp nhằm kéo giảm tai nạn giao thông.',
      accident1: '3',
      accident2: '0',
      accident3: '2',
      accident4: '0',
      length: '21000',
      width: '60',
      type: 'Đường bộ',
      material: 'Nhựa đường',
      start: '10.823, 106.629',
      end: '10.823, 106.629',
      speed: '80km/h',
      condition: 'Không',
      feature: 'Tuyến đường trọng yếu',
      postedAt: '2023-04-13T17:35:06.111Z',
      image: '/assets/images/covers/cover_2.jpg',
    },

    {
      id: 6,
      road: 'Đại lộ Thăng Long',
      district: 'Cầu Giấy',
      city: 'Hà Nội',
      description:
        'Đại lộ Thăng Long là một tuyến đường chính của Hà Nội, nối liền từ ngoại thành Hà Nội vào trung tâm thành phố.',
      image: '/assets/images/covers/cover_6.jpg',
      postedAt: '2022-03-20',
      solution: 'Thường xuyên kiểm tra và bảo dưỡng đường bộ, tuyến đường để đảm bảo an toàn giao thông.',
      length: '30km',
      width: '6-12 làn đường',
      type: 'Đường cao tốc',
      material: 'Bê tông nhựa',
      start: '21.051165, 105.771274',
      end: '21.116925, 105.781581',
      speed: '80km/h',
      condition: 'Không',
      feature: 'Nối liền ngoại thành Hà Nội vào trung tâm thành phố',
      accident1: 1,
      accident2: 2,
      accident3: 3,
      accident4: 2,
    },
    {
      id: 7,
      road: 'Đại lộ Võ Văn Kiệt',
      district: 'Bình Tân',
      city: 'Hồ Chí Minh',
      description: 'Đại lộ Võ Văn Kiệt nối liền Quận 1 và Bình Tân, là tuyến đường chính của TP. Hồ Chí Minh.',
      image: '/assets/images/covers/cover_7.jpg',
      postedAt: '2022-04-05',
      solution:
        'Cải thiện cơ sở hạ tầng đường bộ, tăng cường giám sát và kiểm soát tốc độ xe cộ để giảm nguy cơ tai nạn giao thông.',
      length: '14km',
      width: '4-6 làn đường',
      type: 'Đường cao tốc',
      material: 'Bê tông nhựa',
      start: '10.7312, 106.6892',
      end: '10.7926, 106.7011',
      speed: '80km/h',
      condition: 'Không',
      feature: 'Là tuyến đường chính của TP. Hồ Chí Minh',
      accident1: 2,
      accident2: 3,
      accident3: 4,
      accident4: 5,
    },

    {
      id: 8,
      road: 'Cầu Thanh Trì',
      district: 'Hoàng Mai',
      city: 'Hà Nội',
      description:
        'Cầu Thanh Trì là cây cầu bắc qua sông Hồng nối liền quận Hoàng Mai và Gia Lâm. Cầu có vị trí quan trọng trong việc kết nối các tuyến đường phía Nam của Hà Nội với các khu vực phía Bắc.',
      image: '/assets/images/covers/cover_8.jpg',
      postedAt: '2022-06-18',
      solution:
        'Nâng cấp cầu để tăng khả năng chịu tải, sửa chữa đường bộ, tăng cường kiểm soát tốc độ xe cộ và hạn chế các phương tiện vận tải quá tải trọng.',
      length: '2.8km',
      width: '6 làn đường',
      type: 'Cầu bắc qua sông',
      material: 'Bê tông cốt thép',
      start: '20.9749, 105.8683',
      end: '21.0043, 105.8887',
      speed: '60km/h',
      condition: 'Trong tình trạng tốt',
      feature:
        'Là cầu bắc qua sông Hồng có vai trò quan trọng trong việc kết nối các tuyến đường phía Nam của Hà Nội với các khu vực phía Bắc.',
      accident1: 1,
      accident2: 2,
      accident3: 0,
      accident4: 1,
    },
  ];
  localStorage.setItem('road', JSON.stringify(ROAD));

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [openSearch, setOpenSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dataRoadSearch, setDataRoadSearch] = useState({});
  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
    setValueSearch('');
    setSearchResults('');
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (road) => {
    setDataRoadSearch(road);
    if (dataRoadSearch) {
      setOpenModal(true);
      getCoords(road);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const [coords, setCoords] = useState({ lat: 10.8124974, lng: 106.6161661 });

  const getCoords = async (roadData) => {
    const results = await geocodeByAddress(
      `Đường ${roadData.road}, ${roadData.district}, Thành Phố ${roadData.city}` || ''
    );

    console.log(`Đường ${roadData.road}, ${roadData.district}, Thành Phố ${roadData.city}` || '');
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    setCoords(latLng);
  };

  const handleSearchRoad = () => {
    const result = ROAD.filter(
      (road) =>
        road.road.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.district.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.city.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.description.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.solution.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.length.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.width.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.type.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.material.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.start.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.end.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.speed.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.condition.toLowerCase().includes(valueSearch.toLowerCase()) ||
        road.feature.toLowerCase().includes(valueSearch.toLowerCase())
    );
    setSearchResults(result);
  };

  return (
    <ClickAwayListener onClickAway={handleCloseSearch}>
      <div className={styles.root}>
        {!openSearch && (
          <IconButton onClick={handleOpenSearch}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}
        <Slide direction="down" in={openSearch} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              onChange={(e) => setValueSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchRoad();
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleSearchRoad}>
              Search
            </Button>
            <div className={styles.resultWrap}>
              {searchResults.length > 0 && (
                <div className={styles.result}>
                  <ul>
                    {searchResults.map((road, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 2, p: 2, borderRadius: 1.5, bgcolor: 'background.paper', boxShadow: 1 }}
                      >
                        <Box
                          component="img"
                          alt={road.title}
                          src={road.image}
                          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
                        />

                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                          <Link
                            title="Bấm để xem chi tiết"
                            onClick={() => {
                              handleOpenModal(road);
                            }}
                            color="inherit"
                            variant="subtitle2"
                            underline="hover"
                            noWrap
                          >
                            {`Đường ${road.road}, ${road.district}, Thành Phố ${road.city}` || ''}
                          </Link>

                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {road.description}
                          </Typography>
                        </Box>

                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                          {fToNow(road.postedAt)}
                        </Typography>
                      </Stack>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Modal
              open={openModal}
              onClose={handleCloseModal}
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
                          <TableCell align="left">
                            {`Đường ${dataRoadSearch.road}, ${dataRoadSearch.district}, Thành Phố ${dataRoadSearch.city}` ||
                              ''}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Thông tin cảnh báo
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.description}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Các giải pháp an toàn
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.solution}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Thời gian cập nhật
                          </TableCell>
                          <TableCell align="left">{fToNow(dataRoadSearch.postedAt)}</TableCell>
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
                          <TableCell align="left">{dataRoadSearch.length}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Chiều rộng đoạn đường
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.width}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Loại đường
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.type}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Vật liệu xây dựng đường
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.material}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Điểm đầu và điểm cuối
                          </TableCell>
                          <TableCell align="left">
                            Điểm đầu: {dataRoadSearch.start}
                            <br />
                            Điểm cuối: {dataRoadSearch.end}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Tốc độ giới hạn
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.speed}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Điều kiện đường
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.condition}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Các đặc điểm khác
                          </TableCell>
                          <TableCell align="left">{dataRoadSearch.feature}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2, mt: 4 }}>
                    Bản đồ
                  </Typography>

                  {coords ? (
                    <div style={{ height: '500px', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCbGO-5TBL5L65pu-wQJ7PEoZi2xkzkpqI' }}
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
                  ) : (
                    <p>
                      <Skeleton variant="rectangular" width={210} height={118} />
                    </p>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                      Đóng
                    </Button>
                    {/* <Button variant="contained" sx={{ bgcolor: 'primary.main', color: 'common.white' }}>
      Lưu
    </Button> */}
                  </Box>
                </Box>
              </Box>
            </Modal>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
