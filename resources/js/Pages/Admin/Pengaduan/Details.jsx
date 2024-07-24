import {
    Box,
    Button,
    CardContent,
    Divider,
    Fade,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import MainCard from "@/Components/MainCard";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import moment from "moment";
import axios from "axios";

function Details(props) {
    const [open, setOpen] = useState(false);
    const [datas, setDatas] = useState(props.riwayatPengaduan);
    const handleClose = () => setOpen(false);
    const [selectedPetugas, setSelectedPetugas] = useState();

    console.log(props);

    const handleChange = (e) => {
        setSelectedPetugas(e.target.value);
    };

    const handleSubmit = () => {
        axios
            .post(route("assign-petugas"), {
                pengaduan_id: datas.id,
                petugas_layanan_id: selectedPetugas,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        handleClose();
    };

    return (
        <MainLayout user={props?.auth.user} roles={props?.auth.roles}>
            <Head title="Detail Pengaduan" />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MainCard title="">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Tanggal Pembuatan</InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                        }}
                                    >
                                        {moment(datas.created_at).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Status Laporan</InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {datas.status}
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel>
                                        Tanggal Penyelesaian
                                    </InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                        }}
                                    >
                                        {datas.waktu_penyelesaian
                                            ? moment(
                                                  datas.waktu_penyelesaian
                                              )?.format("DD MMMM YYYY")
                                            : "-"}
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Hasil Perbaikan</InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                        }}
                                    >
                                        {datas.hasil_perbaikan}
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Jenis Barang</InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {datas.barang?.jenis_barang?.jenis_barang}
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Merk Barang</InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {datas.barang?.merk}
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1.25}>
                                    <InputLabel htmlFor="cal-start-date">
                                        Foto Barang
                                    </InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                        }}
                                    >
                                        {datas.gambar.map((gambar) => {
                                            return (
                                                <img
                                                    src={`/storage/${gambar.path}`}
                                                />
                                            );
                                        })}
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel>Keterangan</InputLabel>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            border: "1px solid #bbbbbb",
                                        }}
                                    >
                                        {datas.keterangan}
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} lg={12} marginTop={4}>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={() => setOpen(true)}
                                    type="submit"
                                    size="large"
                                >
                                    Assign Petugas Layanan
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <MainCard
                        title="Assign Petugas Layanan"
                        modal
                        darkTitle
                        content={false}
                    >
                        <CardContent>
                            <Select
                                fullWidth
                                value={selectedPetugas}
                                name="petugas_layanan"
                                onChange={handleChange}
                            >
                                {props.petugas_layanan?.map((val) => (
                                    <MenuItem value={val.id} key={val.id}>
                                        {val.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </CardContent>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                            sx={{ px: 2.5, py: 2 }}
                        >
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleSubmit}
                            >
                                Ok
                            </Button>
                        </Stack>
                    </MainCard>
                </Fade>
            </Modal>
        </MainLayout>
    );
}

export default Details;
