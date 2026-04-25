package com.atos.task.service;

import com.atos.task.model.AccessPort;
import com.atos.task.model.AccessVpn;
import com.atos.task.repository.AccessPortRepository;
import com.atos.task.repository.AccessVpnRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class AccessVpnService {

    final AccessVpnRepository accessVpnRepository;
    final AccessPortRepository accessPortRepository;

    public AccessVpnService(AccessVpnRepository accessVpnRepository, AccessPortRepository accessPortRepository){
        this.accessVpnRepository = accessVpnRepository;
        this.accessPortRepository = accessPortRepository;
    }

    public List<AccessVpn> getAll(){
        return accessVpnRepository.findAll();
    }

    public AccessVpn create(AccessVpn accessVpn){
        AccessVpn vpn = accessVpnRepository.save(accessVpn);
        try{
            List<AccessPort> ports = new ArrayList<>(accessVpn.getAccessPorts());
            accessVpn.getAccessPorts().clear();
            for (AccessPort x : ports){
                AccessPort _port = accessPortRepository.save(x);
                vpn.getAccessPorts().add(_port);
            }
            return accessVpnRepository.save(vpn);
        } catch (Exception e){
            e.printStackTrace();
        }
        return accessVpnRepository.save(vpn);
    }

    /*  public AccessVpn create(AccessVpn accessVpn, List<AccessPort> accessPortList){
        List<AccessPort> portList = accessPortRepository.saveAll(accessPortList);
        AccessVpn _accessVpn = accessVpnRepository.save(accessVpn);

        _accessVpn.getAccessPorts().addAll(portList);

    }*/

    /*public void deleteById(Long id){
        Optional<AccessVpn> vpn = accessVpnRepository.findById(id);
        vpn.ifPresent(
                accessVpn -> {
                    for(AccessPort x : accessVpn.getAccessPorts()){
                        accessVpn.getAccessPorts().remove(x);
                        accessPortRepository.deleteById(x.getId());
                    }
                }
        );
        accessVpnRepository.deleteById(id);
    }*/
    public void deleteById(Long id) {
        Optional<AccessVpn> vpnOptional = accessVpnRepository.findById(id);
        vpnOptional.ifPresent(accessVpn -> {
            Iterator<AccessPort> portIterator = accessVpn.getAccessPorts().iterator();
            while (portIterator.hasNext()) {
                AccessPort accessPort = portIterator.next();
                portIterator.remove();
                accessPortRepository.deleteById(accessPort.getId());
            }

            accessVpnRepository.deleteById(id);
        });
    }
}
